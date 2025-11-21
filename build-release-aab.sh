#!/bin/bash

echo "=========================================="
echo "构建 Release AAB (用于 Google Play)"
echo "=========================================="
echo ""

cd android

# 检查 keystore.properties 是否存在
if [ ! -f "keystore.properties" ]; then
    echo "⚠️  警告: keystore.properties 文件不存在"
    echo ""
    echo "请先完成以下步骤："
    echo "1. 运行 ./generate-keystore.sh 生成 keystore"
    echo "2. 复制模板: cp android/keystore.properties.template android/keystore.properties"
    echo "3. 编辑 android/keystore.properties，填写你的签名信息"
    echo ""
    exit 1
fi

# 构建 Release AAB
echo "开始构建 Release AAB..."
./gradlew bundleRelease --init-script init.gradle

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Release AAB 构建成功！"
    echo ""
    echo "AAB 位置: android/app/build/outputs/bundle/release/app-release.aab"
    echo ""
    ls -lh app/build/outputs/bundle/release/app-release.aab 2>/dev/null || echo "⚠️  文件未找到"
else
    echo ""
    echo "❌ Release AAB 构建失败"
    exit 1
fi

