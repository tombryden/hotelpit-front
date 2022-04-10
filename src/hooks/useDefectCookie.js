import Cookies from "universal-cookie";

export default function useDefectCookie() {
  const cookies = new Cookies();

  function containsDefect(defectCookie) {
    const defectArr = cookies.get("defects");

    if (!defectArr) return false;

    return defectArr.includes(defectCookie);
  }

  return containsDefect;
}
