describe("Changing password", () => {
  before(async () => {
    await device.reloadReactNative();
  });

  describe("When navigating to Settings", () => {
    // Cannot figure out yet how to use testID prop with Tabs
    before(async () => { await element(by.text("Settings")).tap() })

    it("should see button for changing password", async () => {
      await expect(element(by.id("navigateToPasswordForm"))).toBeVisible();
    });

    describe("and then tapping the change password button", () => {
      before(async () => { await element(by.id("navigateToPasswordForm")).tap() })

      it("should see change password form", async () => {
        await expect(element(by.id("currentPasswordField"))).toBeVisible();
        await expect(element(by.id("newPasswordField"))).toBeVisible();
        await expect(element(by.id("repeatNewPasswordField"))).toBeVisible();
      });
    });
  });
});
