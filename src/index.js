import VueMirrorScope from "./components/vue-mirror-scope.vue"

VueMirrorScope.install = (app) =>{
    app.component(VueMirrorScope.name,VueMirrorScope)
}

export default VueMirrorScope