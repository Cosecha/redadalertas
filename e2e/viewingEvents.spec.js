describe("Viewing events", () => {
  before(async () => {
    await device.reloadReactNative();
  });

  it("should see Event Map screen", async () => {
    await expect(element(by.id("eventsMap"))).toBeVisible();
  });
});
