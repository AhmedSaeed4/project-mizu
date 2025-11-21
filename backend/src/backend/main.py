import asyncio
import os
from typing import Any, cast

import uvicorn
from agents import (
    Agent,
    AsyncOpenAI,
    GuardrailFunctionOutput,
    InputGuardrailTripwireTriggered,
    ModelSettings,
    OpenAIChatCompletionsModel,
    OutputGuardrailTripwireTriggered,
    RunConfig,
    RunContextWrapper,
    Runner,
    enable_verbose_stdout_logging,
    function_tool,
    handoff,
    input_guardrail,
    output_guardrail,
)
from agents.agent import StopAtTools
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from openai.types.responses import ResponseTextDeltaEvent
from pydantic import BaseModel

# Load environment variables
load_dotenv()
API_KEY = os.environ.get("GEMINI_API_KEY")
if not API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env file")

# FastAPI App Initialization
app = FastAPI()

# CORS Middleware
origins = [
    "http://localhost:3000",  # Next.js default port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Agent Configuration
client = AsyncOpenAI(
    api_key=API_KEY, base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

model = OpenAIChatCompletionsModel(model="gemini-2.5-flash", openai_client=client)

config = RunConfig(
    model=model,
    model_provider=client,
)


@function_tool
def example_tool(name: str) -> str:
    """An example tool that greets a person."""
    return f"Hello, {name}!"


main_Agent = Agent(
    name="main_agent",
    instructions="You are a helpful assistant that can answer questions",
    tools=[example_tool],
    model_settings=ModelSettings(tool_choice="required"),
)


# Pydantic Models for API
class UserInput(BaseModel):
    text: str


class AgentResponse(BaseModel):
    output: str


# API Endpoint
@app.post("/agent", response_model=AgentResponse)
async def run_agent(user_input: UserInput):
    response = await Runner.run(main_Agent, user_input.text, run_config=config)
    return AgentResponse(output=response.final_output)


# Run the server
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
