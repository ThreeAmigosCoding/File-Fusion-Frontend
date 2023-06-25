import {MultimediaMetadata} from "./model/multimedia";

export function getFileName(file: MultimediaMetadata): string {
    return file.name.split('.')[0];
}

export function getFilePreviewImageSource(file: MultimediaMetadata): string {
    const extension = file.type;

    switch (extension) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
            return file.data_url;
        case 'mp3':
        case 'wav':
        case 'aac':
            return 'assets/images/Audio.svg';
        case 'mp4':
        case 'mov':
        case 'avi':
            return 'assets/images/Video.svg';
        case 'pdf':
            return 'assets/images/PDF.svg';
        case 'txt':
            return 'assets/images/Text.svg';
        default:
            return 'assets/images/File.svg';
    }
}

export function getFileTypeString(file: MultimediaMetadata): string {
    const extension = file.type;

    switch (extension) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
            return 'image';
        case 'mp3':
        case 'wav':
        case 'aac':
            return 'audio';
        case 'mp4':
        case 'mov':
        case 'avi':
            return 'video';
        // case 'pdf':
        //     return 'pdf';
        // case 'txt':
        //     return 'txt';
        default:
            return 'unknown';
    }
}
