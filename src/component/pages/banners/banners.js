import React, { useState } from "react";
import axios from "axios";
import ServerCardB from "./widgets/serverCardB";
import $ from "jquery";

function Banners(props) {
  const [name, setName] = useState("");
  const [cards, setCards] = useState([]);
  const search = () => {
    if (name != "") {
      axios
        .get(
          "https://api.battlemetrics.com/servers?page[size]=5&filter[search]=" +
            name
        )
        .then((res) => {
          setCards(
            res.data.data.map((e) => (
              <ServerCardB
                props={e}
                key={e.id}
                imgURL={
                  props.global.STORAGE +
                  "/storage/images/" +
                  e.relationships.game.data.id +
                  ".png"
                }
              />
            ))
          );
          $("#paginationB").show();
        });
    } else {
      setCards([]);
      $("#paginationB").hide();
    }
  };
  return (
    <div id="site-container" className="css-1q59fp3">
      <div className="left side-unit">
        <div style={{}} />
      </div>
      <div id="content-container">
        <div className="container" id="main">
          <div className="css-xdr8f7">
            <div className="row">
              <div className="col-md-6">
                <h1 className="h2">About Banners</h1>
                <p>
                  Banners are available for all servers we track. We've done our
                  best to provide the most customization options. We serve our
                  banners over a top tier{" "}
                  <abbr title="Content Delivery Network">CDN</abbr> using HTTPS
                  to make sure banners are delivered fast and can be used on any
                  website.
                </p>
                <p>
                  Banners are available on this page, or from any server page by
                  clicking on 'Banners'.
                </p>
              </div>
              <div className="col-md-6">
                <h2>Banner Features</h2>
                <dl>
                  <dt>Fast updates</dt>
                  <dd>
                    Banners are kept up to date with the information on our
                    website.{" "}
                    <a className="css-p9ht2a" href="/subscription/plans">
                      Subscribers
                    </a>{" "}
                    have access to banners that update in real time without
                    refreshes just like our website.
                  </dd>
                  <dt>HTTPS access</dt>
                  <dd>
                    All banners are served over HTTPS so that they can be used
                    on any website.
                  </dd>
                  <dt>Customizable</dt>
                  <dd>
                    <p>
                      Pick a color, any color. You're not limited to just a few
                      styles or stuck with one chart option.
                    </p>
                    <p>
                      Still not enough options?{" "}
                      <a className="css-p9ht2a" href="/subscription/plans">
                        Subscribers
                      </a>{" "}
                      have access to the banner code. If you know a bit of HTML
                      and CSS you can create a completely custom banner. Create
                      a custom size, add and remove links - the possibilities
                      are endless. <br />
                      <a href="/banners/new">Try the banner editor</a>.
                    </p>
                  </dd>
                  <dt>HTML and Image formats</dt>
                  <dd>
                    <p>
                      All our banners are available as HTML or image banners.
                      We've got HTML banners for your website or blog and image
                      banners for everything else.
                    </p>
                    <p>
                      Found some place you can't embed a banner?{" "}
                      <a href="/contact">Contact us</a> and we'll do our best to
                      help you out.
                    </p>
                  </dd>
                </dl>
              </div>
            </div>
            <h3>Banners</h3>
            <div>
              <p>
                Before we can show you banners we need a server to use for
                previews.
              </p>
              <div className="server-picker">
                <hr />
                <div className="form-group">
                  <label htmlFor="serverPicker">Search by Server Name</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      style={{ padding: "6px 12px" }}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <div className="input-group-btn">
                      <button
                        type="button"
                        className="css-1dcotcn"
                        onClick={(e) => search()}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  {cards}
                  <div id="paginationB" className="pagination" style={{display:"none"}}>
                    <button type="button" className="css-1m4imoj">
                      Next <i className="glyphicon glyphicon-chevron-right" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="right side-unit">
        <div style={{}} />
      </div>
    </div>
  );
}
export default Banners;
