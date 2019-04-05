describe("Example", () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should display Event Map screen", async () => {
    await expect(element(by.text("Event Map"))).toBeVisible();
  });
});
