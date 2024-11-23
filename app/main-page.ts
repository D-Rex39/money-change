import { EventData, Page } from '@nativescript/core';
import { MainViewModel } from './view-models/main-view-model';
import { Camera } from '@nativescript/camera';
import { MLKitTextRecognition } from 'nativescript-mlkit-text-recognition';

let viewModel: MainViewModel;
let textRecognition: MLKitTextRecognition;
let cameraView: any;

export function navigatingTo(args: EventData) {
    const page = <Page>args.object;
    
    if (!viewModel) {
        viewModel = new MainViewModel();
        textRecognition = new MLKitTextRecognition();
    }
    
    page.bindingContext = viewModel;
    
    // カメラの初期化と権限の要求
    Camera.requestPermissions().then(
        function success() {
            startCamera();
        },
        function failure() {
            console.log('カメラの権限が拒否されました');
        }
    );
}

async function startCamera() {
    try {
        cameraView = await Camera.createCameraView({
            keepAspectRatio: true,
            saveToGallery: false,
            enablePinchZoom: true
        });

        // 定期的にフレームをキャプチャして文字認識を実行
        setInterval(async () => {
            const image = await cameraView.takePhoto();
            const result = await textRecognition.recognizeTextFromImage(image);
            
            if (result && result.text) {
                // 数値を抽出して変換
                const numbers = result.text.match(/\d+(\.\d+)?/);
                if (numbers) {
                    const amount = parseFloat(numbers[0]);
                    await viewModel.convertScannedAmount(amount);
                }
            }
        }, 1000); // 1秒ごとに実行

    } catch (error) {
        console.error('カメラの初期化に失敗しました:', error);
    }
}