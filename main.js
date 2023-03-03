import './style.css'

import { BrowserMultiFormatReader } from "@zxing/library"

import VConsole from 'vconsole';

const vConsole = new VConsole();

const resultDom = document.querySelector(".result")

const codeReader = new BrowserMultiFormatReader()

let decodeFromInputVideoFunc = (firstDeviceId) => {
  codeReader.decodeFromInputVideoDeviceContinuously(
    null,    // firstDeviceId  为null 时默认选择面向环境的摄像头
    "video",
    (result, err) => {
      if (result) {
        resultDom.innerHTML = result
        console.log(result, "扫描结果");
      }
      if (err && !err) {
        result.innerHTML = `
          <span>error: </span> ${err}
        `
        console.error(err);
      }
    }
  );
};

let openScan = async () => {
  codeReader
    .listVideoInputDevices()
    .then((videoInputDevices) => {
      console.log("videoInputDevices", videoInputDevices, "摄像头设备");

      // 默认获取第一个摄像头设备id
      let firstDeviceId = videoInputDevices[0].deviceId;  // 根据id选择摄像头

      decodeFromInputVideoFunc(firstDeviceId);
      // navigator.getUserMedia(
      //   { video: { deviceId: firstDeviceId } },
      //   () => {
      //     console.log(document.cookie);
      // decodeFromInputVideoFunc(firstDeviceId);
      //   },
      //   () => {
      //     Toast("请关闭链接,重新进入");
      //     router.back();
      //   }
      // );
    })
    .catch((err) => {});
};

openScan()