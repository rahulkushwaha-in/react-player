import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faMusic } from "@fortawesome/free-solid-svg-icons";

function Nav({ libraryStatus, setlibraryStatus }) {
  return (
    <nav>
      <h1>Sound Waves</h1>
      <button onClick={() => setlibraryStatus(!libraryStatus)}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
}

export default Nav;
