import { useEffect, useRef, useState } from "react";

const makeFakeRequestForNode = (node) => {
  return setTimeout(() => {
    const target = node.querySelector("#container");

    if (!target) {
      console.warn("Target container not found in new Ads node");

      return;
    }

    let parentNode = target.parentNode;

    if (!parentNode) {
      console.warn("Parent node not found for target container");

      return;
    }

    const newElement = document.createElement("div");
    newElement.appendChild(document.createTextNode("INSERTED ADS"));

    setTimeout(() => {
      const latestTarget = node.querySelector("#container");
      parentNode = latestTarget?.parentNode;

      if (!latestTarget || !parentNode) {
        console.warn("Target or parentNode disappeared before insert");

        return;
      }

      if (parentNode.contains(latestTarget)) {
        parentNode.insertBefore(latestTarget, newElement);
      } else {
        console.warn("Target moved or removed before insert");
      }
    }, 0);
  }, 1000 * 2);
};

const makeFakeRequest = (id) => {
  const target = document.querySelector(`#ads-component-${id} #container`);
  const newElement = document.createElement("b");
  const newContent = document.createTextNode("INSERTED ADS");

  // add the text node to the newly created div
  newElement.appendChild(newContent);

  return setTimeout(() => {
    console.log("target ", target);
    const parentNode = target.parentNode;
    parentNode.insertBefore(target, newElement);
  }, 1000 * 2);
};

export const Ads = ({ id }) => {
  const timer = useRef();
  const containerRef = useRef();

  useEffect(() => {
    console.log(`Ads component ${id} mounted`);

    return () => {
      console.log(`Ads component ${id} unmounted`);
    };
  }, []);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.removedNodes.forEach((removedNode) => {
          if (removedNode instanceof HTMLElement) {
            const isCurrent =
              removedNode.getAttribute("id") === `ads-component-${id}`;

            if (isCurrent && timer.current) {
              clearTimeout(timer.current);
              timer.current = null;
            }
          }
        });

        mutation.addedNodes.forEach((addedNode) => {
          if (
            addedNode instanceof HTMLElement &&
            addedNode.id === `ads-component-${id}`
          ) {
            console.log(`Detected Ads clone in DOM: ${id}`);
            containerRef.current = addedNode;

            if (!timer.current) {
              // timer.current = makeFakeRequest(id);
              timer.current = makeFakeRequestForNode(addedNode);
            }
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [id]);

  // useEffect(() => {
  //   timer.current = makeFakeRequest(id);
  // }, [id]);

  return (
    <div data-ads={true} id={`ads-component-${id}`} ref={containerRef}>
      <div id="container">{`Ads component ${id}`}</div>
    </div>
  );
};

const AdsWrapper = ({ id }) => {
  useEffect(() => {
    console.log(`AdsWrapper ${id} mounted`);

    return () => {
      console.log(`AdsWrapper ${id} unmounted`);
    };
  }, []);

  return <Ads id={id} />;
};

export default AdsWrapper;
