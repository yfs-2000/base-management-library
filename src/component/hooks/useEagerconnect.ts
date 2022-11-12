import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import connectorsByName from "src/utili/walletConnect";
import { useDispatch } from "react-redux";
import { myLocalStorage } from "src/utili/method";
//自动连接
// @ts-ignore
export default function useEagerConnect() {
  const { activate } = useWeb3React(); // specifically using useWeb3ReactCore because of what this hook does
  const dispatch = useDispatch();
  useEffect(() => {
    const JsonName = myLocalStorage.getItem("connectorName");
    const connectorName = JsonName || "";
    // @ts-ignore
    const connector = connectorsByName[connectorName]?.connector;
    async function fn() {
      // @ts-ignore
      if (typeof window.ethereum !== "undefined" && connectorName) {
        try {
          // @ts-ignore
          await activate(connectorsByName[connectorName]?.connector);
        } catch (e) {}
      } else if (connectorName) {
        /*   if (walletconnect instanceof WalletConnectConnector && walletconnect.walletConnectProvider?.wc?.uri) {
          walletconnect.walletConnectProvider = undefined
        }*/
        if (connector.walletConnectProvider?.wc?.uri) {
          connector.walletConnectProvider = undefined;
        }
        activate(connector, undefined, true).catch((error) => {
          /*if (error) {
            autoLoginError();
            console.log("error in EagerConnect walletconnect");
          } else {
            setTried(true);
          }*/
        });
      }
    }
    fn();
    // if (connectorName === "Metamask") {
    //   connector.isAuthorized().then(async (isAuthorized) => {
    //     console.log(connector, isAuthorized);
    //     if (isAuthorized) {
    //       try {
    //         await activate(connector);
    //       } catch (e) {
    //         autoLoginError();
    //       }
    //     } else {
    //       if (isMobile && window.ethereum) {
    //         activate(connector, undefined, true).catch((error) => {
    //           autoLoginError();
    //         });
    //       } else {
    //         autoLoginError();
    //       }
    //     }
    //   });
    // } else if (connectorName) {
    //   /*   if (walletconnect instanceof WalletConnectConnector && walletconnect.walletConnectProvider?.wc?.uri) {
    //     walletconnect.walletConnectProvider = undefined
    //   }*/
    //   if (connector.walletConnectProvider?.wc?.uri) {
    //     connector.walletConnectProvider = undefined;
    //   }
    //   activate(connector, undefined, true).catch((error) => {
    //     console.log(error);
    //     autoLoginError();
    //     /*if (error) {
    //       autoLoginError();
    //       console.log("error in EagerConnect walletconnect");
    //     } else {
    //       setTried(true);
    //     }*/
    //   });
    // }
  }, [activate, dispatch]);
}
