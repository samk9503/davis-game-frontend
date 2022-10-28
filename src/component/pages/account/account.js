import React, { useState } from "react";
import UserProfile from "../auth/user";
import Loading from "../../widgets/loading";
const Account = (props) => {
  const [loading, setLoading] = useState(false);
  return (
    <div id="site-container" className="css-1q59fp3">
      <div id="content-container">
        <ol
          className="container css-11ox9o0"
          itemScope=""
          itemType="https://schema.org/BreadcrumbList"
        >
          <li
            itemProp="itemListElement"
            itemScope=""
            itemType="https://schema.org/ListItem"
            className="css-c7thuy"
          >
            <a itemProp="item" href="/account">
              <span itemProp="name">Account</span>
            </a>
            <meta itemProp="position" content={1} />
          </li>
        </ol>
        <div className="container" id="main">
          <div>
            <div className="row">
              <div className="col-11">
                <h2>Account</h2>
              </div>
              <div className="col-1">
                <a
                  className="css-1dcotcn"
                  href="servers"
                  onClick={(e)=>{
                    e.preventDefault()
                    props.handleClick('account/servers')
                  }}
                  style={{ margin: "20px -20px" }}
                >
                  Servers
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <h3>Account details</h3>
                <dl>
                  <dt>Email</dt>
                  <dd>
                    <span>
                      {UserProfile.getEmail()} (unverified,{" "}
                      <button className="css-1m4imoj">
                        resend verification email
                      </button>
                      )
                    </span>
                  </dd>
                  <dt>Account Tier</dt>
                  <dd>
                    <span>
                      Standard (
                      <a href="/subscription/plans">Subscription Plans</a>
                      .)
                    </span>
                  </dd>
                  <dt>Account Balance</dt>
                  <dd>
                    <span>
                      $0.00 - <a href="/account/addBalance">Add Money</a>
                    </span>
                  </dd>
                  <dt>Browser Notifications</dt>
                  <dd>
                    <span>
                      Disabled <button className="css-1m4imoj">Enable</button>
                    </span>
                  </dd>
                </dl>
                <form>
                  <div className="form-group">
                    <label htmlFor="input-locale">Date &amp; Time Locale</label>
                    <select
                      name="locale"
                      id="input-locale"
                      className="form-control"
                    >
                      <option value="af">Afrikaans</option>
                      <option value="sq">Albanian</option>
                      <option value="ar">Arabic</option>
                      <option value="ar-ma">Arabic (Morocco)</option>
                      <option value="ar-sa">Arabic (Saudi Arabia)</option>
                      <option value="ar-tn">Arabic (Tunisia)</option>
                      <option value="hy-am">Armenian</option>
                      <option value="az">Azerbaijani</option>
                      <option value="id">Bahasa Indonesia</option>
                      <option value="ms-my">Bahasa Melayu (Malaysia)</option>
                      <option value="eu">Basque</option>
                      <option value="be">Belarusian</option>
                      <option value="bn">Bengali</option>
                      <option value="bs">Bosnian</option>
                      <option value="br">Breton</option>
                      <option value="bg">Bulgarian</option>
                      <option value="my">Burmese</option>
                      <option value="ca">Catalan</option>
                      <option value="zh-cn">Chinese (Simplified)</option>
                      <option value="zh-tw">Chinese (Traditional)</option>
                      <option value="cv">Chuvash</option>
                      <option value="hr">Croatian</option>
                      <option value="cs">Czech</option>
                      <option value="da">Danish</option>
                      <option value="nl">Dutch</option>
                      <option value="en-au">English (Australia)</option>
                      <option value="en-ca">English (Canada)</option>
                      <option value="en-ie">English (Ireland)</option>
                      <option value="en-nz">English (New Zealand)</option>
                      <option value="en-gb">English (United Kingdom)</option>
                      <option value="en" selected="">
                        English (United States)
                      </option>
                      <option value="eo">Esperanto</option>
                      <option value="et">Estonian</option>
                      <option value="fo">Faroese</option>
                      <option value="fi">Finnish</option>
                      <option value="fr">French</option>
                      <option value="fr-ca">French (Canada)</option>
                      <option value="fr-ch">French (Switzerland)</option>
                      <option value="fy">Frisian</option>
                      <option value="gl">Galician</option>
                      <option value="ka">Georgian</option>
                      <option value="de">German</option>
                      <option value="de-at">German (Austria)</option>
                      <option value="el">Greek</option>
                      <option value="he">Hebrew</option>
                      <option value="hi">Hindi</option>
                      <option value="hu">Hungarian</option>
                      <option value="is">Icelandic</option>
                      <option value="it">Italian</option>
                      <option value="ja">Japanese</option>
                      <option value="jv">Javanese</option>
                      <option value="kk">Kazakh</option>
                      <option value="km">Khmer (Cambodia)</option>
                      <option value="tlh">Klingon</option>
                      <option value="ko">Korean</option>
                      <option value="lo">Lao</option>
                      <option value="lv">Latvian</option>
                      <option value="lt">Lithuanian</option>
                      <option value="lb">Luxembourgish</option>
                      <option value="mk">Macedonian</option>
                      <option value="ml">Malayalam</option>
                      <option value="dv">Maldivian</option>
                      <option value="mr">Marathi</option>
                      <option value="me">Montenegrin</option>
                      <option value="ne">Nepalese</option>
                      <option value="se">Northern Sami</option>
                      <option value="nb">Norwegian</option>
                      <option value="nn">Norwegian Nynorsk</option>
                      <option value="fa">Persian</option>
                      <option value="pl">Polish</option>
                      <option value="pt">Portuguese</option>
                      <option value="pt-br">Portuguese (Brazil)</option>
                      <option value="ro">Romanian</option>
                      <option value="ru">Russian</option>
                      <option value="gd">Scottish Gaelic</option>
                      <option value="sr">Serbian</option>
                      <option value="sr-cyrl">Serbian Cyrillic</option>
                      <option value="si">Sinhalese</option>
                      <option value="sk">Slovak</option>
                      <option value="sl">Slovenian</option>
                      <option value="es">Spanish</option>
                      <option value="sw">Swahili</option>
                      <option value="sv">Swedish</option>
                      <option value="tl-ph">Tagalog (Filipino)</option>
                      <option value="tzl">Talossan</option>
                      <option value="tzm">Tamaziɣt</option>
                      <option value="tzm-latn">Tamaziɣt Latin</option>
                      <option value="ta">Tamil</option>
                      <option value="te">Telugu</option>
                      <option value="th">Thai</option>
                      <option value="bo">Tibetan</option>
                      <option value="tr">Turkish</option>
                      <option value="uk">Ukrainian</option>
                      <option value="uz">Uzbek</option>
                      <option value="vi">Vietnamese</option>
                      <option value="cy">Welsh</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="input-tz">Time Zone</label>
                    <select name="tz" id="input-tz" className="form-control">
                      <option value="Pacific/Midway">Midway Island</option>
                      <option value="Pacific/Samoa">Samoa</option>
                      <option value="Pacific/Honolulu">Hawaii</option>
                      <option value="US/Alaska">Alaska</option>
                      <option value="America/Los_Angeles">
                        Pacific Time (US &amp; Canada)
                      </option>
                      <option value="America/Tijuana">Tijuana</option>
                      <option value="US/Arizona">Arizona</option>
                      <option value="America/Chihuahua">Chihuahua</option>
                      <option value="America/Mazatlan">Mazatlan</option>
                      <option value="US/Mountain">
                        Mountain Time (US &amp; Canada)
                      </option>
                      <option value="America/Managua">Central America</option>
                      <option value="US/Central">
                        Central Time (US &amp; Canada)
                      </option>
                      <option value="America/Mexico_City">Guadalajara</option>
                      <option value="America/Mexico_City">Mexico City</option>
                      <option value="America/Monterrey">Monterrey</option>
                      <option value="Canada/Saskatchewan">Saskatchewan</option>
                      <option value="America/Bogota">Bogota</option>
                      <option value="US/Eastern">
                        Eastern Time (US &amp; Canada)
                      </option>
                      <option value="US/East-Indiana">Indiana (East)</option>
                      <option value="America/Lima">Lima</option>
                      <option value="America/Bogota">Quito</option>
                      <option value="Canada/Atlantic">
                        Atlantic Time (Canada)
                      </option>
                      <option value="America/Caracas">Caracas</option>
                      <option value="America/La_Paz">La Paz</option>
                      <option value="America/Santiago">Santiago</option>
                      <option value="Canada/Newfoundland">Newfoundland</option>
                      <option value="America/Sao_Paulo">Brasilia</option>
                      <option value="America/Argentina/Buenos_Aires">
                        Buenos Aires
                      </option>
                      <option value="America/Argentina/Buenos_Aires">
                        Georgetown
                      </option>
                      <option value="America/Godthab">Greenland</option>
                      <option value="America/Noronha">Mid-Atlantic</option>
                      <option value="Atlantic/Azores">Azores</option>
                      <option value="Atlantic/Cape_Verde">
                        Cape Verde Is.
                      </option>
                      <option value="Africa/Casablanca">Casablanca</option>
                      <option value="Europe/London">Edinburgh</option>
                      <option value="Etc/Greenwich">
                        Greenwich Mean Time : Dublin
                      </option>
                      <option value="Europe/Lisbon">Lisbon</option>
                      <option value="Europe/London">London</option>
                      <option value="Africa/Monrovia">Monrovia</option>
                      <option value="UTC" selected="">
                        UTC
                      </option>
                      <option value="Europe/Amsterdam">Amsterdam</option>
                      <option value="Europe/Belgrade">Belgrade</option>
                      <option value="Europe/Berlin">Berlin</option>
                      <option value="Europe/Berlin">Bern</option>
                      <option value="Europe/Bratislava">Bratislava</option>
                      <option value="Europe/Brussels">Brussels</option>
                      <option value="Europe/Budapest">Budapest</option>
                      <option value="Europe/Copenhagen">Copenhagen</option>
                      <option value="Europe/Ljubljana">Ljubljana</option>
                      <option value="Europe/Madrid">Madrid</option>
                      <option value="Europe/Paris">Paris</option>
                      <option value="Europe/Prague">Prague</option>
                      <option value="Europe/Rome">Rome</option>
                      <option value="Europe/Sarajevo">Sarajevo</option>
                      <option value="Europe/Skopje">Skopje</option>
                      <option value="Europe/Stockholm">Stockholm</option>
                      <option value="Europe/Vienna">Vienna</option>
                      <option value="Europe/Warsaw">Warsaw</option>
                      <option value="Africa/Lagos">West Central Africa</option>
                      <option value="Europe/Zagreb">Zagreb</option>
                      <option value="Europe/Athens">Athens</option>
                      <option value="Europe/Bucharest">Bucharest</option>
                      <option value="Africa/Cairo">Cairo</option>
                      <option value="Africa/Harare">Harare</option>
                      <option value="Europe/Helsinki">Helsinki</option>
                      <option value="Europe/Istanbul">Istanbul</option>
                      <option value="Asia/Jerusalem">Jerusalem</option>
                      <option value="Europe/Helsinki">Kyiv</option>
                      <option value="Africa/Johannesburg">Pretoria</option>
                      <option value="Europe/Riga">Riga</option>
                      <option value="Europe/Sofia">Sofia</option>
                      <option value="Europe/Tallinn">Tallinn</option>
                      <option value="Europe/Vilnius">Vilnius</option>
                      <option value="Asia/Baghdad">Baghdad</option>
                      <option value="Asia/Kuwait">Kuwait</option>
                      <option value="Europe/Minsk">Minsk</option>
                      <option value="Africa/Nairobi">Nairobi</option>
                      <option value="Asia/Riyadh">Riyadh</option>
                      <option value="Europe/Volgograd">Volgograd</option>
                      <option value="Asia/Tehran">Tehran</option>
                      <option value="Asia/Muscat">Abu Dhabi</option>
                      <option value="Asia/Baku">Baku</option>
                      <option value="Europe/Moscow">Moscow</option>
                      <option value="Asia/Muscat">Muscat</option>
                      <option value="Europe/Moscow">St. Petersburg</option>
                      <option value="Asia/Tbilisi">Tbilisi</option>
                      <option value="Asia/Yerevan">Yerevan</option>
                      <option value="Asia/Kabul">Kabul</option>
                      <option value="Asia/Karachi">Islamabad</option>
                      <option value="Asia/Karachi">Karachi</option>
                      <option value="Asia/Tashkent">Tashkent</option>
                      <option value="Asia/Calcutta">Chennai</option>
                      <option value="Asia/Kolkata">Kolkata</option>
                      <option value="Asia/Calcutta">Mumbai</option>
                      <option value="Asia/Calcutta">New Delhi</option>
                      <option value="Asia/Calcutta">Sri Jayawardenepura</option>
                      <option value="Asia/Katmandu">Kathmandu</option>
                      <option value="Asia/Almaty">Almaty</option>
                      <option value="Asia/Dhaka">Astana</option>
                      <option value="Asia/Dhaka">Dhaka</option>
                      <option value="Asia/Yekaterinburg">Ekaterinburg</option>
                      <option value="Asia/Rangoon">Rangoon</option>
                      <option value="Asia/Bangkok">Bangkok</option>
                      <option value="Asia/Bangkok">Hanoi</option>
                      <option value="Asia/Jakarta">Jakarta</option>
                      <option value="Asia/Novosibirsk">Novosibirsk</option>
                      <option value="Asia/Hong_Kong">Beijing</option>
                      <option value="Asia/Chongqing">Chongqing</option>
                      <option value="Asia/Hong_Kong">Hong Kong</option>
                      <option value="Asia/Krasnoyarsk">Krasnoyarsk</option>
                      <option value="Asia/Kuala_Lumpur">Kuala Lumpur</option>
                      <option value="Australia/Perth">Perth</option>
                      <option value="Asia/Singapore">Singapore</option>
                      <option value="Asia/Taipei">Taipei</option>
                      <option value="Asia/Ulan_Bator">Ulaan Bataar</option>
                      <option value="Asia/Urumqi">Urumqi</option>
                      <option value="Asia/Irkutsk">Irkutsk</option>
                      <option value="Asia/Tokyo">Osaka</option>
                      <option value="Asia/Tokyo">Sapporo</option>
                      <option value="Asia/Seoul">Seoul</option>
                      <option value="Asia/Tokyo">Tokyo</option>
                      <option value="Australia/Adelaide">Adelaide</option>
                      <option value="Australia/Darwin">Darwin</option>
                      <option value="Australia/Brisbane">Brisbane</option>
                      <option value="Australia/Canberra">Canberra</option>
                      <option value="Pacific/Guam">Guam</option>
                      <option value="Australia/Hobart">Hobart</option>
                      <option value="Australia/Melbourne">Melbourne</option>
                      <option value="Pacific/Port_Moresby">Port Moresby</option>
                      <option value="Australia/Sydney">Sydney</option>
                      <option value="Asia/Yakutsk">Yakutsk</option>
                      <option value="Asia/Vladivostok">Vladivostok</option>
                      <option value="Pacific/Auckland">Auckland</option>
                      <option value="Pacific/Fiji">Fiji</option>
                      <option value="Pacific/Kwajalein">
                        International Date Line West
                      </option>
                      <option value="Asia/Kamchatka">Kamchatka</option>
                      <option value="Asia/Magadan">Magadan</option>
                      <option value="Pacific/Fiji">Marshall Is.</option>
                      <option value="Asia/Magadan">New Caledonia</option>
                      <option value="Asia/Magadan">Solomon Is.</option>
                      <option value="Pacific/Auckland">Wellington</option>
                      <option value="Pacific/Tongatapu">Nuku'alofa</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="input-unit_length">Unit of Length</label>
                    <select
                      name="unit_length"
                      id="input-unit_length"
                      className="form-control"
                    >
                      <option value="mi">Mile</option>
                      <option value="km">Kilometer</option>
                    </select>
                  </div>
                  <button type="submit" className="css-1dcotcn">
                    Save
                  </button>
                </form>
                <h3>Notification services</h3>
                <div>
                  <span />
                  <div className="css-6rqk0u">
                    <p>
                      You have not added any notification services to your
                      account.
                    </p>
                  </div>
                  <div>
                    <button className="css-1dcotcn" type="button">
                      Create new notification method
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h3>
                  Associated Player Profiles
                  <div className="css-1234tng">
                    <a
                      className="css-1m4imoj"
                      href="/account/management#methods"
                    >
                      Manage
                    </a>
                  </div>
                </h3>
                <div className="css-6rqk0u">
                  You may add Steam accounts to your BattleMetrics account and
                  claim associated player profiles under{" "}
                  <a href="/account/management">Account Management</a>.
                </div>
                <div>
                  <h3>Account Limits</h3>
                  <h4>Email 0/90</h4>
                  <div className="css-1a81es2">
                    <div
                      color="#fff"
                      className="css-1rzv9el"
                      style={{ width: "0%" }}
                    />
                  </div>
                  <h4>Alert Objects 0/10</h4>
                  <div className="css-1a81es2">
                    <div
                      color="#fff"
                      className="css-1rzv9el"
                      style={{ width: "0%" }}
                    />
                  </div>
                </div>
                <h3>Account Management</h3>
                <p>
                  You can can change your password, manage multi-factor
                  authentication, active sessions, and sign in methods in
                  account management.
                </p>
                <a className="css-1dcotcn" href="/account/management">
                  Account Management
                </a>
                <h3>Account Settings</h3>
                <p>
                  You can view which settings have been changed from their
                  defaults and reset them in account settings.
                </p>
                <a className="css-1dcotcn" href="/account/settings">
                  Account Settings
                </a>
                <h3>Balance History &amp; Invoices</h3>
                <p>
                  You can view your account balance history and print invoices.
                </p>
                <a className="css-1dcotcn" href="/account/transactions">
                  Balance History
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Account;
