/**
 * @file 上传服务
 * @author ym3
 */
import axios from 'axios';
import setting from './setting';

window.axios = axios;

// 文字识别页面
export function ocrIdcard(formData) {
    return axios.post(setting.urls.OCR_IDCARD, formData);
}

// 人物属性页面
export function personAttribute(formData) {
    return axios.post(setting.urls.CHARACTERATTRIBUTE, formData);
}

// 标签识别
export function analysisVideoattr(formData,version) {
    if(version === 'v1'){
        return axios.post(setting.urls.ANALYSIS_V1_VIDEOATTR, formData);
    }
    return axios.post(setting.urls.ANALYSIS_V2_VIDEOATTR, formData);
}
//标签识别-标签列表
export function labelV1Tag () {
    return axios.get(setting.urls.LABEL_V1_TAG);
}
export function labelV2Tag () {
    return axios.get(setting.urls.LABEL_V2_TAG);
}

// 人像检测
export function objDetection (formData) {
    return axios.post(setting.urls.OBJ_DETECTION, formData);
}
//人像检测-标签列表
export function humanTag () {
    return axios.get(setting.urls.HUMAN_TAG);
}

// 场景分类
export function analysisVideoscene (formData, midea) {
    if(midea === '视频'){
        return axios.post(setting.urls.ANALYSIS_VIDEOSCENE, formData);
    }
    return axios.post(setting.urls.ANALYSIS_IMAGESCENE, formData);
}
//场景分类-标签列表
export function sceneTag () {
    return axios.get(setting.urls.SCENE_TAG);
}

// 水印检测
export function analysisWatermark (formData, midea) {
    if(midea === '视频'){
        return axios.post(setting.urls.ANALYSIS_WATERMARK_VIDEO, formData);
    }
    return axios.post(setting.urls.ANALYSIS_WATERMARK_IMAGE, formData);

}
//水印检测-标签列表
export function watermarkTag () {
    return axios.get(setting.urls.WATERMARK_TAG);
}

// 画质识别
export function imgQualityclf (formData) {
  return axios.post(setting.urls.IMG_QUALITYCLF, formData);
}
//画质识别-标签列表
export function qualityTag () {
    return axios.get(setting.urls.QUALITY_TAG);
}

// 物体检测
export function videoObjectDetection (formData, midea) {
    if(midea === '视频'){
    return axios.post(setting.urls.VIDEO_OBJECT, formData);
  }
  return axios.post(setting.urls.IMG_OBJECT, formData);
}
//物体检测-标签列表
export function objectTag () {
    return axios.get(setting.urls.OBJECT_TAG);
}

// 广告物体识别
export function adDetection(formData) {
  return axios.post(setting.urls.AD_DETECTION_DETS, formData);
}
// 广告物体识别-标签列表
export function adTag () {
    return axios.get(setting.urls.AD_TAG);
}

// 鉴黄识别
export function pronographic(formData) {
  return axios.post(setting.urls.PRONOGRAPHIC, formData);
}
// 鉴黄识别-标签列表
export function pronographicTag () {
    return axios.get(setting.urls.PRONOGRAPHIC_TAG);
}