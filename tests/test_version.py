# pylint: disable=missing-function-docstring, missing-class-docstring
import semver
from idtrace import __version__


class TestVersion:
    # pylint: disable=too-few-public-methods
    def test_version(self) -> None:
        version = semver.VersionInfo.parse(__version__)
        assert version.major == 0
        assert version.minor > 0
