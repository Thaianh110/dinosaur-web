import icons from "./icons";
import path from "./path";
const { IoStarOutline, IoStarSharp } = icons;

export const createSlug = (string) =>
  string
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");

export const formatMoney = (number) =>
  Number(number?.toFixed(1)).toLocaleString();

export const renderStartFromNumber = (number, size) => {
  if (!Number(number)) return;
  const stars = [];
  for (let i = 0; i < number; i++) {
    stars.push(<IoStarSharp color="orange" size={size || 16} />);
  }
  for (let i = 5; i > +number; i--) {
    stars.push(<IoStarOutline color="orange" size={size || 16} />);
  }
  if (number === 0) {
    for (let i = number; i < 5; i++) {
      stars.push(<IoStarSharp color="orange" size={size || 16} />);
    }
  }
  return stars;
};

export function secondsToHMS(d) {
  d = Number(d) / 1000;
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);
  return { h, m, s };
}

export const validate = (payload, setInvalidFields) => {
  let invalids = 0;
  const formatPayload = Object.entries(payload);
  for (let arr of formatPayload) {
    if (arr[1].trim() === "") {
      invalids++;
      setInvalidFields((prev) => [
        ...prev,
        { name: arr[0], mes: "Không được bỏ trống" },
      ]);
    }
  }
  // for (let arr of formatPayload) {
  //   const regEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  //   const regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  //   switch (arr[0]) {
  //     case "email":
  //       if (!arr[1].match(regEmail)) {
  //         invalids++;
  //         setInvalidFields((prev) => [
  //           ...prev,
  //           { name: arr[0], mes: "Email không hợp lệ" },
  //         ]);
  //       }
  //       break;
  //       case "password":    
  //           if (!arr[1].match(regPassword)) {
  //             invalids++;
  //             setInvalidFields((prev) => [
  //               ...prev,
  //               { name: arr[0], mes: "Password không hợp lệ" },
  //             ]);
  //           }
  //           break;

  //     default:
  //       break;
  //   }
  // }
  return invalids;
};

export const formatPrice = number => Math.round(number / 1000) * 1000

export const generateRange = (start, end) => {
  const length = end + 1 - start
  return Array.from({length},(_, index) => start+ index)
}

export function getBase64(file){
  if(!file) return ''
  return new Promise((resolve,reject )=> {
    var render = new FileReader();
    render.readAsDataURL(file);
    render.onload = () => resolve(render.result)
    render.onerror = error => reject(error)
  })
}

