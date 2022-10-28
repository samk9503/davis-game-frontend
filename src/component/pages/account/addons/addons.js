import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import {
  faRocket,
  faThumbsUp,
  faHistory,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import UserProfile from "../../auth/user";
import GuideToAddWebHook from "./guideToGetWebHook";
const Addons = (props) => {
  const id = useParams().id;
  const [addons, setAddons] = useState(null);
  const [addonsData, setAddonsData] = useState(null);
  const [show, setShow] = useState(false);
  const [webhook, setWebhook] = useState(null);
  const [choiceAddonsId, setChoiceAddonsId] = useState(null);
  const handleClose = () => {
    $("#webhookAdded").hide();
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handlePay = () => {
    axios
      .post(props.global.API + "/checkAddons", {
        serverId: id,
        addonsId: choiceAddonsId,
      })
      .then((res) => {
        if (res.data.length > 0) {
        } else {
          axios
            .post(props.global.API + "/setAddons", {
              userId: UserProfile.getId(),
              serverId: id,
              addonsId: choiceAddonsId,
              webhook: webhook,
            })
            .then((res) => {
              console.log(res);
            });
          handleClose();
        }
      });
  };
  const handlePays = (name, price) => {
    axios
      .get(
        "https://checkout.tebex.io/api/baskets/b7g8e6-3309e632855f0c37eb835ac8a03bbdf278a4e2db",
        {},
        {
          auth: {
            username: "1201426",
            password: "XguUpua8xiBxWsPJ368FPHEumCOVStUn",
          },
        }
      )
      .then((res) => {
        // console.log(res);
      });
    axios
      .post(
        "https://checkout.tebex.io/api/baskets/b7g8e6-3309e632855f0c37eb835ac8a03bbdf278a4e2db/packages",
        JSON.stringify({
          package: {
            name: "test",
            price: 1.25,
            expiry_period: "day",
            expiry_length: 28,
            metaData: {
              custom: "custom-ref-123",
            },
          },
          type: "single",
        }),
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type, Accept, Authorization",
          },
          auth: {
            username: "1201426",
            password: "XguUpua8xiBxWsPJ368FPHEumCOVStUn",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        console.log("e");
      });
    axios
      .post(
        "https://checkout.tebex.io/api/baskets",
        {
          return_url: "https://localhost:3000/servers/csgo/5873087/addons",
          complete_url: "https://localhost:3000/servers/csgo/5873087/addons",
        },
        {
          auth: {
            username: "1201426",
            password: "XguUpua8xiBxWsPJ368FPHEumCOVStUn",
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
  };
  useEffect(() => {
    axios.post(props.global.API + "/getAddonsData").then((res) => {
      setAddonsData(res.data);
    });
  }, []);
  useEffect(() => {
    if (addonsData !== null) {
      axios
        .post(props.global.API + "/getAddons", { serverId: id })
        .then((res) => {
          var addons = [];
          res.data.forEach((element) => {
            addons.push(element.addonsId);
          });
          setAddons(
            addonsData.map((e) =>
              addons.includes(e.id.toString()) ? (
                <></>
              ) : (
                <div style={{ height: "360px" }}>
                  <div className="css-5kyi6i" style={{ textAlign: "center" }}>
                    <div id="headerCard" style={{ height: "35%" }}>
                      <div>
                        <FontAwesomeIcon
                          icon={
                            e.icon === "discord"
                              ? brands("discord")
                              : e.icon === "steam"
                              ? brands("steam")
                              : e.icon === "thumbs-up"
                              ? faThumbsUp
                              : e.icon === "rocket"
                              ? faRocket
                              : e.icon === "history"
                              ? faHistory
                              : faFileAlt
                          }
                          size="5x"
                          className="centerSVG"
                        />
                      </div>
                      <div>
                        <span>{e.title}</span>
                        <p class="mb-2 font-13">
                          <span>Type : </span>
                          {e.type}
                        </p>
                      </div>
                    </div>
                    <div class="divider-text mt-3">Addon Info</div>
                    <div id="bodyCrad" style={{ height: "30%" }}>
                      <p class="mt-2 font-13">{e.info}</p>
                    </div>
                    <div class="divider-text mt-3">Payment Info</div>
                    <footer className="css-1syrouw">
                      <div class="col">
                        <span class="font-22 m-0 fw-bold">${e.amount}</span>
                        <p class="mb-0 text-muted">Server Cash™</p>
                      </div>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          setChoiceAddonsId(e.id);
                          if (e.id === "1") {
                            handleShow();
                          }
                        }}
                        class="btn btn-sm btn-outline-secondary px-4"
                        id="Buy_Discord_Webhook"
                        name="Buy_Discord_Webhook"
                      >
                        <b>Purchase Addon</b>
                      </button>
                    </footer>
                  </div>
                </div>
              )
            )
          );
        });
    }
  }, [addonsData]);
  return (
    <>
      {/* <Modal
        id="payModal"
        style={{ opacity: 1 }}
        backdrop={false}
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <h1>Tebex</h1>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tebex Wallet Address:</Form.Label>
              <Form.Control type="text" placeholder="05165..." autoFocus />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              handlePay("test", "10.0");
            }}
          >
            Pay
          </Button>
        </Modal.Footer>
      </Modal> */}
      <Modal
        id="webhookAdded"
        style={{ opacity: 1 }}
        backdrop={false}
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>WebHook</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <GuideToAddWebHook storage={props.global.STORAGE} />
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
              style={{ paddingTop: "10px" }}
            >
              <Form.Label>Webhook Url:</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setWebhook(e.target.value)}
                placeholder="https://discordapp.com/api/webhooks/..."
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              handlePay();
            }}
          >
            Pay
          </Button>
        </Modal.Footer>
      </Modal>
      <div id="site-container" className="css-1q59fp3">
        <div id="content-container">
          <div className="tab-content" id="pills-tabContent">
            <ol
              className="container css-11ox9o0"
              itemScope=""
              itemType="https://schema.org/BreadcrumbList"
            >
              <li
                itemProp="itemListElement"
                itemScope=""
                itemType="https://schema.org/ListItem"
                className="css-ku7g1k"
              >
                <a
                  itemProp="item"
                  href="/servers"
                  onClick={(e) => {
                    e.preventDefault();
                    props.handleClick("account");
                  }}
                >
                  <span itemProp="name">Account</span>
                </a>
                <meta itemProp="position" content={1} />
              </li>
              <li
                itemProp="itemListElement"
                itemScope=""
                itemType="https://schema.org/ListItem"
                className="css-ku7g1k"
              >
                <a
                  itemProp="item"
                  href="/servers"
                  onClick={(e) => {
                    e.preventDefault();
                    props.handleClick("account/servers");
                  }}
                >
                  <span itemProp="name">Servers</span>
                </a>
                <meta itemProp="position" content={1} />
              </li>
              <li
                itemProp="itemListElement"
                itemScope=""
                itemType="https://schema.org/ListItem"
                className="css-c7thuy"
              >
                <a itemProp="item" href="/account/login">
                  <span itemProp="name">Addons</span>
                </a>
                <meta itemProp="position" content={2} />
              </li>
            </ol>

            <div id="site-container" className="css-1q59fp3">
              <div id="content-container">
                <div className="container" id="main">
                  <div className="css-1jgd03p">
                    <div
                      className="css-16cxn6a"
                      style={{ gridAutoRows: "unset" }}
                    >
                      {addons}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Addons;
