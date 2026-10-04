let currentOrderCode = "";
let isOrderValid = false;
let isRunning = true;

do {
  let menu = 
    "========================================\n" +
    "    QUẦY LỄ TÂN PHÒNG GYM FITNESS       \n" +
    "========================================\n" +
    "1. Nhập và chuẩn hóa mã đơn hàng\n" +
    "2. Tính tiền và in hóa đơn phụ kiện\n" +
    "3. Thoát chương trình\n" +
    "========================================\n" +
    "Vui lòng chọn chức năng (1 - 3):";

  let userInput = prompt(menu);

  if (userInput === null) {
    alert("Vui lòng chọn số từ 1 đến 3 trên menu.");
    continue;
  }

  let choice = userInput.trim();

  switch (choice) {
    case "1": {
      currentOrderCode = "";
      isOrderValid = false;

      let rawCode = prompt("Nhập mã đơn hàng (Bắt đầu bằng 'GYM-' và tối thiểu 8 ký tự):");
      if (rawCode === null || rawCode.trim() === "") {
        alert("Mã đơn hàng không được để trống.");
        break;
      }

      let normalized = rawCode.trim().toUpperCase();

      if (normalized.length < 8) {
        alert(`Mã đơn hàng quá ngắn (${normalized.length}/8 ký tự).`);
        break;
      }

      if (!normalized.startsWith("GYM-")) {
        alert("Mã đơn hàng phải bắt đầu bằng tiền tố 'GYM-'.");
        break;
      }

      let bodyPart = normalized.slice(4);
      let hasInvalidChar = false;
      for (let i = 0; i < bodyPart.length; i++) {
        if (bodyPart[i] === " ") {
          hasInvalidChar = true;
          break;
        }
      }

      if (hasInvalidChar) {
        alert("Mã đơn hàng không được chứa khoảng trắng ở phần thân.");
        break;
      }

      currentOrderCode = normalized;
      isOrderValid = true;
      alert(`Thành công! Mã đơn hàng "${currentOrderCode}" hợp lệ.`);
      break;
    }

    case "2": {
      if (!isOrderValid) {
        alert("Từ chối: Bạn chưa nhập hoặc chưa kiểm chuẩn mã đơn hàng ở Chức năng 1!");
        break;
      }

      let itemInput = prompt("Chọn phụ kiện mua:\n- SHAKER (Bình lắc: 120.000 VNĐ)\n- GLOVES (Găng tay: 180.000 VNĐ)\n- STRAP (Dây kéo lưng: 150.000 VNĐ)\nNhập mã phụ kiện (SHAKER, GLOVES, STRAP):");
      if (itemInput === null) break;

      let itemCode = itemInput.trim().toUpperCase();
      let itemName = "";
      let unitPrice = 0;

      if (itemCode === "SHAKER") {
        itemName = "Bình lắc";
        unitPrice = 120000;
      } else if (itemCode === "GLOVES") {
        itemName = "Găng tay tập tạ";
        unitPrice = 180000;
      } else if (itemCode === "STRAP") {
        itemName = "Dây kéo lưng";
        unitPrice = 150000;
      } else {
        alert("Mã phụ kiện không tồn tại.");
        break;
      }

      let qtyInput = prompt("Nhập số lượng mua:");
      if (qtyInput === null) break;

      let quantity = Number(qtyInput.trim());
      if (isNaN(quantity) || quantity <= 0 || !Number.isInteger(quantity)) {
        alert("Số lượng phải là số nguyên lớn hơn 0.");
        break;
      }

      let vipInput = prompt("Khách hàng có thẻ VIP không? (Y/N):");
      if (vipInput === null) break;

      let isVip = vipInput.trim().toUpperCase() === "Y";

      let baseAmount = unitPrice * quantity;
      let discount = isVip ? baseAmount * 0.1 : 0;
      let finalAmount = baseAmount - discount;

      let receipt = 
        "-".repeat(40) + "\n" +
        "         HÓA ĐƠN BÁN LẺ PHỤ KIỆN         \n" +
        "-".repeat(40) + "\n" +
        `Mã đơn hàng : ${currentOrderCode}\n` +
        `Sản phẩm    : ${itemName}\n` +
        `Đơn giá     : ${unitPrice.toLocaleString("vi-VN").padStart(10, " ")} VNĐ\n` +
        `Số lượng    : ${String(quantity).padStart(10, " ")}\n` +
        `Thành tiền  : ${baseAmount.toLocaleString("vi-VN").padStart(10, " ")} VNĐ\n` +
        `Giảm giá VIP: ${discount.toLocaleString("vi-VN").padStart(10, " ")} VNĐ\n` +
        "-".repeat(40) + "\n" +
        `TỔNG CỘNG   : ${finalAmount.toLocaleString("vi-VN").padStart(10, " ")} VNĐ\n` +
        "-".repeat(40);

      alert(receipt);

      currentOrderCode = "";
      isOrderValid = false;
      break;
    }

    case "3": {
      alert("Chương trình đã kết thúc. Tạm biệt!");
      isRunning = false;
      break;
    }

    default: {
      alert("Lựa chọn không hợp lệ! Vui lòng chọn số từ 1 đến 3.");
      break;
    }
  }
} while (isRunning);