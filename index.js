import VueMirrorScope from "./dist/vue-mirror-scope.es"

import "./dist/style.css"

export {
    VueMirrorScope
}

const install = (app) => { app.component('VueMirrorScope',VueMirrorScope)}

export default {
    install
}