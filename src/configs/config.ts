const apiSetting =
    process.env.NEXT_PUBLIC_API_SETTING_URL || "http://localhost";

console.log("================================");
console.log("NEXT_PUBLIC_API_SETTING_URL =", process.env.NEXT_PUBLIC_API_SETTING_URL);
console.log("apiSetting =", apiSetting);
console.log("================================");

export default apiSetting;