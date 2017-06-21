import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Gallery Images
import gal_1 from './components/gallery/400.jpeg';
import gal_2 from './components/gallery/400-2.jpeg';
import gal_3 from './components/gallery/400-3.jpeg';
import gal_4 from './components/gallery/400-4.jpeg';

// Tabbed Carousel Images
import tab_1 from './components/tabbed_carousel/tab-1.jpeg';
import tab_2 from './components/tabbed_carousel/tab-2.jpeg';
import tab_3 from './components/tabbed_carousel/tab-3.jpeg';
import tab_4 from './components/tabbed_carousel/tab-4.jpg';

import UserPermissions from './components/user_permissions/user_permissions';
import Alert from "./components/alert/alert";
import Gallery from "./components/gallery/gallery";
import NationalPromotions from "./components/tabbed_carousel/tabbed_carousel";
import Map from "./components/map/map";
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const user_permissions_parsed = {"allow_punchout":false,"can_see_prices":true,"can_request_quote":true,"allow_user_management":true};
const images = [gal_1, gal_2, gal_3, gal_4];
const tabs_data = {"promotions":{"4":{"title":"Test title 1","asset_url":tab_1,"url":"#"},"3":{"title":"Test title 2","asset_url":tab_2,"url":"#"},"2":{"title":"Test title 3","asset_url":tab_3,"url":"#"},"1":{"title":"Test title 4","asset_url":tab_4,"url":"#"}}};

ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(<Alert showAmount={true} amount={10} type={'alert-danger'} message={'this is a test message'}/>, document.querySelector(".alert-test"));

ReactDOM.render(<UserPermissions user_id={1} user_permissions={user_permissions_parsed} />, document.querySelector(".permissions-list"));

ReactDOM.render(<Gallery data={images} />, document.querySelector(".gallery"));

ReactDOM.render(<NationalPromotions data={tabs_data} />, document.querySelector(".tabs"));

ReactDOM.render(<Map />, document.querySelector(".branch-locator"));

registerServiceWorker();
