/**
 * @file 通用setting
 * @author CarrySun
 */


let HOST = null

if (process.env.NODE_ENV === 'development') {
  HOST = '/api/'
} else {
}

const setting = {
    urls: {
        // 身份证识别-图片
        OCR_IDCARD: HOST + 'v1/ocr/image/idcard',
        // 人物属性（性别、年龄、发型、颜值）-图片
        CHARACTERATTRIBUTE: HOST + 'v1/person/image/attribute',

        // 美拍视频标签分类-v1
        ANALYSIS_V1_VIDEOATTR: HOST + 'v1/classification/video/label',
        // 美拍视频标签分类-v2
        ANALYSIS_V2_VIDEOATTR: HOST + 'v2/classification/video/label',
        //美拍视频标签分类-V1标签列表
        LABEL_V1_TAG: HOST + 'v1/tag/label',
        //美拍视频标签分类-V2标签列表
        LABEL_V2_TAG: HOST + 'v2/tag/label',

        // 场景识别-视频
        ANALYSIS_VIDEOSCENE: HOST + 'v1/classification/video/scene',
        // 场景识别-图片
        ANALYSIS_IMAGESCENE: HOST + 'v1/classification/image/scene',
        //场景识别-标签列表
        SCENE_TAG: HOST + 'v1/tag/scene',

        // 人像检测
        OBJ_DETECTION: HOST + 'v1/detection/image/human',
        //人像检测-标签列表
        HUMAN_TAG: HOST + 'v1/tag/human',

        // 竞品水印检测-视频
        ANALYSIS_WATERMARK_VIDEO: HOST + 'v1/classification/video/watermark',
        // 竞品水印检测-图片
        ANALYSIS_WATERMARK_IMAGE: HOST + 'v1/classification/image/watermark',
        // 竞品水印检测-标签列表
        WATERMARK_TAG: HOST + 'v1/tag/watermark',

        // 画质分类-图片
        IMG_QUALITYCLF: HOST + 'v1/classification/image/quality',
        // 画质分类-标签列表
        QUALITY_TAG: HOST + 'v1/tag/quality',

        // 物体检测-视频
        VIDEO_OBJECT: HOST + 'v1/detection/video/object',
        // 物体检测-图片
        IMG_OBJECT: HOST + 'v1/detection/image/object',
        // 物体检测-标签列表
        OBJECT_TAG: HOST + 'v1/tag/object',

        // 广告物体检测-图片
        AD_DETECTION_DETS: HOST + 'v1/classification/image/ad',
        //广告物体检测-标签列表
        AD_TAG: HOST + 'v1/tag/ad',

        // 鉴黄识别-视频
        PRONOGRAPHIC: HOST + 'v1/classification/video/pronographic',
        // 鉴黄识别-标签列表
        PRONOGRAPHIC_TAG: HOST + 'v1/tag/pronographic',
        
    }
};
export default setting;
