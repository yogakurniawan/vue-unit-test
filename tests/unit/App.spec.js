import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import App from "@/App.vue";
import NestedRoute from "@/components/NestedRoute.vue";
import routes from "@/router/routes";

const localVue = createLocalVue();
localVue.use(VueRouter);

// jest.mock("@/components/NestedRoute", () => ({
//   name: "NestedRoute",
//   render: h => h("div", "hello world")
// }));

describe("App", () => {
  it("it renders a child component via routing", async () => {
    const router = new VueRouter({ routes });
    const wrapper = mount(App, {
      localVue,
      router
    });

    router.push("/nested-route");
    await wrapper.vm.$nextTick();

    console.log(wrapper.html());

    expect(wrapper.find(NestedRoute).exists()).toBe(true);
  });

  it("it renders a username from query string", () => {
    const username = "alice";
    const wrapper = shallowMount(NestedRoute, {
      mocks: {
        $route: {
          params: {
            username
          }
        }
      }
    });

    expect(wrapper.find(".username").text()).toBe(username);
  });
});
