import { useEffect, useState } from "react";

const makeFakeRequest = (id) => {
  setTimeout(() => {
    const target = document.querySelector(`#ads-component-${id} #container`);

    const newElement = document.createElement("div");

    setTimeout(() => {
      console.log("target ", target);
      const parentNode = target.parentNode;
      parentNode.insertBefore(target, newElement);
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

  return (
    <div data-ads={true} id={`ads-component-${id}`}>
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
            const isAds = removedNode.getAttribute("data-ads");

            if (isAds) {
              setIsNodeExist(false);
            }
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return isNodeExist ? <Ads id={id} /> : false;
};

export default AdsWrapper;
