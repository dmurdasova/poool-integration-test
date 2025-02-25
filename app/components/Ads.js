import { useEffect, useState } from "react";

const makeFakeRequest = (id) => {
  // I'm not 100% sure how ads work, but we define slots BEFORE we send requests for them
  // that means that we need to store them immediately as we "call" function
  const target = document.querySelector(`#ads-component-${id} #container`);

  setTimeout(() => {
    const newElement = document.createElement("div");

    setTimeout(() => {
      // this element was not deleted - it exists
      console.log("target ", target);

      const parentNode = target.parentNode;
      parentNode.insertBefore(target, newElement);

      // ERROR HERE - NotFoundError: Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.
    }, 1000 * 2);
  }, 1000 * 0.05);
};

export const Ads = ({ id }) => {
  useEffect(() => {
    console.log(`Ads component ${id} mounted`);

    return () => {
      console.log(`Ads component ${id} unmounted`);
    };
  }, []);

  useEffect(() => {
    makeFakeRequest(id);
  }, [id]);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.removedNodes.forEach((removedNode) => {
          if (
            removedNode instanceof HTMLElement &&
            removedNode.getAttribute("id") === `ads-component-${id}`
          ) {
            console.log(`Detected Ads remove from DOM: ${id}`);

            // if (timer.current) {
            //   clearTimeout(timer.current);
            //   timer.current = null;
            // }
          }
        });

        mutation.addedNodes.forEach((addedNode) => {
          if (
            addedNode instanceof HTMLElement &&
            addedNode.id === `ads-component-${id}`
          ) {
            console.log(`Detected Ads clone in DOM: ${id}`);

            // containerRef.current = addedNode;

            // if (!timer.current) {
            //   timer.current = makeFakeRequest(id);
            // }
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [id]);

  return (
    <div id={`ads-component-${id}`}>
      <div id="container">{`Ads component ${id}`}</div>
    </div>
  );
};

const AdsWrapper = ({ id }) => {
  const [isNodeExist, setIsNodeExist] = useState(true);

  useEffect(() => {
    console.log(`AdsWrapper ${id} mounted`);

    return () => {
      console.log(`AdsWrapper ${id} unmounted`);
    };
  }, []);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.removedNodes.forEach((removedNode) => {
          if (removedNode instanceof HTMLElement) {
            const isCurrent =
              removedNode.getAttribute("id") === `ads-component-${id}`;

            if (isCurrent) {
              setIsNodeExist(false);
            }
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  // if we are trying to remove this NODE, we will get an error - most likely
  // ads is trying to remove a previous container or something like that

  // ERROR: NotFoundError: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.

  return isNodeExist ? <Ads id={id} /> : null;

  // return <Ads id={id} />;
};

export default AdsWrapper;
