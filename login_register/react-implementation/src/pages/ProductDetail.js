import React, { useState } from "react"
import Detail from "../images/Detail.png"
import Heart from "react-heart"
import Contact from "../images/contact.png"
import Favorites from "components/Favorite/Favorites"
import { Link } from "react-router-dom"
import Layout from "Layout"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Pagination, Navigation } from "swiper/core"
import "swiper/swiper.min.css"
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"
import "../css/verify.css"
SwiperCore.use([Pagination, Navigation])

export default function UserProfile(props) {
  const [active, setActive] = useState(true)

  return (
    <React.Fragment>
      <Layout>
        <Swiper
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          className="mySwiper"
        >
          <SwiperSlide>
            {" "}
            <img src={Detail} />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <img src={Detail} />
          </SwiperSlide>
        </Swiper>

        <div className="has-text-centered">
          {/* <figure className="image is-inline-block mt-4">
            <img src={Detail} />
          </figure> */}
          <div className="columns is-mobile">
            <div className="column mt-3 ml-3 has-text-left">
              <strong>
                美品《Christian Dior 藍色Oblique 提花布 24公分 30 MONTAIGNE
                斜背包》
              </strong>
            </div>
          </div>
        </div>
        <p className="has-text-right mr-6">
          <strong>原價 $15000</strong>
        </p>
        <div className="columns is-mobile">
          <div className="column ml-3">
            <span class="icon">
              <Heart isActive={active} onClick={() => setActive(!active)} />
            </span>
            <span class="icon">
              <img src={Contact} />
            </span>
          </div>
          <div className="column has-text-right mr-6">
            <strong>買斷 $50000</strong>
          </div>
        </div>
        <div className="link-top"></div>
        <div className="content ml-4 mt-3">
          <h1 className="content is-large">商品資訊</h1>
        </div>

        <div className="columns is-mobile ">
          <div class="column is-3 ml-4 ">商品編號：</div>
          <div class="column is-narrow ml-5 ">1111</div>
        </div>
        <div className="columns is-mobile">
          <div class="column is-3 ml-4">商品尺寸：</div>
          <div class="column is-narrow ml-5 ">L號</div>
        </div>
        <div className="columns is-mobile">
          <div class="column is-3 ml-4">商品敘述：</div>
          <div class="column is-narrow ml-5 ">Hello</div>
        </div>
        <div className="columns is-mobile">
          <div class="column is-3 ml-4">附有配件備註：</div>
          <div class="column is-narrow ml-5 ">可出租</div>
        </div>
        <div className="link-top"></div>
        <div className="columns is-mobile has-text-centered">
          <div class="column is-6 is-narrow">
            <Link to="/cartUpdate">
              <button>確定租用</button>
            </Link>
          </div>
          <div class="column is-6 is-narrow">
            <Link to="/cartUpdate">
              <button>確定買斷</button>
            </Link>
          </div>
        </div>
        <div className="link-top"></div>
        <p className="has-text-centered">您可能喜歡 ...</p>
        <Favorites />
      </Layout>
    </React.Fragment>
  )
}
