import React, { useEffect, useState } from "react";
import axios from "axios";
import UserProfile from "../../auth/user";
import { Modal, Button, Form } from "react-bootstrap";
import $ from "jquery";
import GuideToAddServer from "./guideToAddServer";
const UserServers = (props) => {
  const [addons, setAddons] = useState(null);
  const [show, setShow] = useState(false);
  const [serverId, setServerId] = useState("");
  const handleClose = () => {
    $("#addServerModal").hide();
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const getUserServers = () => {
    axios
      .post(props.global.API + "/getUserServers", { id: UserProfile.getId() })
      .then((result) => {
        if (result.data.length > 0) {
          var data = [];
          var bar = new Promise((resolve, reject) => {
            result.data.forEach((element) => {
              axios
                .get("https://api.battlemetrics.com/servers/" + element)
                .then((res) => {
                  data.push(res.data.data);
                  if (data.length == result.data.length) {
                    resolve();
                  }
                });
            });
          });
          bar.then(() => {
            setAddons(
              data.map((e) => (
                <div>
                  <div className="css-5kyi6i" style={{ textAlign: "center" }}>
                    <div>
                      <img
                        src={
                          props.global.STORAGE +
                          "/storage/images/" +
                          e.relationships.game.data.id +
                          ".png"
                        }
                        width={24}
                        height={24}
                        alt={e.attributes.name}
                      />{" "}
                      <span>{e.attributes.name}</span>
                    </div>
                    <div class="divider-text mt-3">Server Info</div>
                    <div style={{ display: "flex", padding: "0 10px" }}>
                      <p class="mt-2" style={{ fontSize: "12px" }}>
                        Address:{" "}
                      </p>
                      <p
                        class="mt-2"
                        style={{ fontSize: "12px", marginLeft: "auto" }}
                      >
                        {e.attributes.ip}:{e.attributes.port}
                      </p>
                    </div>
                    <div style={{ display: "flex", padding: "0 10px" }}>
                      <p class="mt-2" style={{ fontSize: "12px" }}>
                        Players:{" "}
                      </p>
                      <p
                        class="mt-2"
                        style={{ fontSize: "12px", marginLeft: "auto" }}
                      >
                        {e.attributes.players}/{e.attributes.maxPlayers}
                      </p>
                    </div>
                    <div style={{ display: "flex", padding: "0 10px" }}>
                      <p class="mt-2" style={{ fontSize: "12px" }}>
                        Map:{" "}
                      </p>
                      <p
                        class="mt-2"
                        style={{ fontSize: "12px", marginLeft: "auto" }}
                      >
                        {e.attributes.details.map}
                      </p>
                    </div>

                    <footer className="css-1syrouw">
                      <button
                        style={{ width: "100%", height: "40px" }}
                        onClick={(event) => {
                          event.preventDefault();
                          props.handleClick("account/servers/addons/" + e.id);
                        }}
                        class="btn btn-sm btn-outline-secondary px-4"
                        id="Buy_Discord_Webhook"
                        name="Buy_Discord_Webhook"
                      >
                        <b>Addons</b>
                      </button>
                    </footer>
                  </div>
                </div>
              ))
            );
          });
        }
      });
  };
  useEffect(() => {
    axios
      .post(props.global.API + "/getUserServers", { id: UserProfile.getId() })
      .then((result) => {
        if (result.data.length > 0) {
          var data = [];
          var bar = new Promise((resolve, reject) => {
            result.data.forEach((element) => {
              axios
                .get("https://api.battlemetrics.com/servers/" + element)
                .then((res) => {
                  data.push(res.data.data);
                  if (data.length == result.data.length) {
                    resolve();
                  }
                });
            });
          });
          bar.then(() => {
            setAddons(
              data.map((e) => (
                <div>
                  <div className="css-5kyi6i" style={{ textAlign: "center" }}>
                    <div>
                      <img
                        src={
                          props.global.STORAGE +
                          "/storage/images/" +
                          e.relationships.game.data.id +
                          ".png"
                        }
                        width={24}
                        height={24}
                        alt={e.attributes.name}
                      />{" "}
                      <span>{e.attributes.name}</span>
                    </div>
                    <div class="divider-text mt-3">Server Info</div>
                    <div style={{ display: "flex", padding: "0 10px" }}>
                      <p class="mt-2" style={{ fontSize: "12px" }}>
                        Address:{" "}
                      </p>
                      <p
                        class="mt-2"
                        style={{ fontSize: "12px", marginLeft: "auto" }}
                      >
                        {e.attributes.ip}:{e.attributes.port}
                      </p>
                    </div>
                    <div style={{ display: "flex", padding: "0 10px" }}>
                      <p class="mt-2" style={{ fontSize: "12px" }}>
                        Players:{" "}
                      </p>
                      <p
                        class="mt-2"
                        style={{ fontSize: "12px", marginLeft: "auto" }}
                      >
                        {e.attributes.players}/{e.attributes.maxPlayers}
                      </p>
                    </div>
                    <div style={{ display: "flex", padding: "0 10px" }}>
                      <p class="mt-2" style={{ fontSize: "12px" }}>
                        Map:{" "}
                      </p>
                      <p
                        class="mt-2"
                        style={{ fontSize: "12px", marginLeft: "auto" }}
                      >
                        {e.attributes.details.map}
                      </p>
                    </div>

                    <footer className="css-1syrouw">
                      <button
                        style={{ width: "100%", height: "40px" }}
                        onClick={(event) => {
                          event.preventDefault();
                          props.handleClick("account/servers/addons/" + e.id);
                        }}
                        class="btn btn-sm btn-outline-secondary px-4"
                        id="Buy_Discord_Webhook"
                        name="Buy_Discord_Webhook"
                      >
                        <b>Addons</b>
                      </button>
                    </footer>
                  </div>
                </div>
              ))
            );
          });
        }
      });
  }, []);
  return (
    <>
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
                className="css-c7thuy"
              >
                <a itemProp="item" href="/account/login">
                  <span itemProp="name">Servers</span>
                </a>
                <meta itemProp="position" content={2} />
              </li>
            </ol>

            <div id="site-container" className="css-1q59fp3">
              <div id="content-container">
                <div className="container" id="main">
                  <Modal
                    id="addServerModal"
                    style={{ opacity: 1 }}
                    show={show}
                    onHide={handleClose}
                  >
                    <Modal.Header>
                      <h2>Add Server</h2>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <GuideToAddServer storage={props.global.STORAGE} />
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Server Id:</Form.Label>
                          <Form.Control
                            onChange={(e) => setServerId(e.target.value)}
                            type="text"
                            placeholder="132165"
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
                          if (serverId !== "") {
                            axios.post(props.global.API + "/setUserServer", {
                              id: UserProfile.getId(),
                              serverId: serverId,
                            });
                            handleClose();
                            getUserServers();
                          }
                        }}
                      >
                        Add
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <div className="row">
                    <div className="col-11">
                      <h2>Servers</h2>
                    </div>
                    <div className="col-1">
                      <a
                        className="css-1dcotcn"
                        href="servers"
                        onClick={(e) => {
                          e.preventDefault();
                          handleShow();
                        }}
                        style={{ margin: "20px -20px" }}
                      >
                        Add server
                      </a>
                    </div>
                  </div>
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
export default UserServers;
