import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import App from "@/App.vue";
import NestedRoute from "@/components/NestedRoute.vue";
import routes from "@/router/routes";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("App", () => {
  it("renders a child component via routing", async () => {
    const router = new VueRouter({ routes });
    const wrapper = mount(App, {
      localVue,
      router
    });

    router.push("/nested-route");

    await wrapper.vm.$nextTick();

    expect(wrapper.find(NestedRoute).exists()).toBe(true);
  });

  it("should have different route than /nested-route", () => {
    const router = new VueRouter({ routes, mode: "abstract" });
    const wrapper = mount(App, {
      localVue,
      router
    });

    expect(wrapper.find(NestedRoute).exists()).toBe(false);
  });
});
