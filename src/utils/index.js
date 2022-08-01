module.exports = {
  timestampToTime(timestamp) {
    const date = new Date(timestamp);
    const Y = date.getFullYear() + "-";
    const M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    const D =
      date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
    const h =
      date.getHours() < 10
        ? "0" + date.getHours() + ":"
        : date.getHours() + ":";
    const m =
      date.getMinutes() < 10
        ? "0" + date.getMinutes() + ":"
        : date.getMinutes() + ":";
    const s =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
  },
  addressAbbreviation(address) {
    let fronAddr = "";
    let endAddr = "";
    for (let i = 0; i < address.length; i++) {
      if (i < 5) {
        fronAddr += address[i];
      }
      if (i > 37) {
        endAddr += address[i];
      }
    }
    return fronAddr + "..." + endAddr;
  },
};
