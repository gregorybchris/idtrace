import logging

import click

logger = logging.getLogger(__name__)


@click.group()
def main() -> None:
    """Main CLI entrypoint."""


@main.command(name="run")
@click.option("--debug", is_flag=True, help="Enable debug logging")
def run_command(
    debug: bool = False,
) -> None:
    """Run the CLI."""
    if debug:
        logging.basicConfig(level=logging.DEBUG)

    logger.info("Running CLI")
