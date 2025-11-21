#!/bin/bash

echo "=========================================="
echo "生成 Release Keystore"
echo "=========================================="
echo ""
echo "这个脚本将帮你生成用于签名 Release APK 的 keystore 文件"
echo ""
echo "⚠️  重要提示："
echo "   - 请记住你设置的密码，丢失后无法更新应用"
echo "   - Keystore 密码和 Key 密码可以设置相同"
echo "   - 姓名、组织等信息可以填写任意内容"
echo ""

cd android/app

# 检查是否已存在 keystore
if [ -f "my-release-key.keystore" ]; then
    echo "⚠️  警告: my-release-key.keystore 已存在"
    read -p "是否要覆盖？(y/N): " overwrite
    if [ "$overwrite" != "y" ] && [ "$overwrite" != "Y" ]; then
        echo "已取消"
        exit 0
    fi
    rm -f my-release-key.keystore
fi

echo ""
echo "接下来 keytool 会要求你输入以下信息："
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. 输入 keystore 密码（需要输入两次确认）"
echo "2. 再次输入 keystore 密码（确认）"
echo "3. 输入你的姓名（可以填写：FlowNote）"
echo "4. 输入组织单位名称（可以填写：Development）"
echo "5. 输入组织名称（可以填写：FlowNote）"
echo "6. 输入城市或区域名称（可以填写：Beijing）"
echo "7. 输入省/市/自治区代码（可以填写：BJ）"
echo "8. 输入国家/地区代码（可以填写：CN）"
echo "9. 确认信息是否正确（输入 yes）"
echo "10. 输入 key 密码（可以直接回车使用和 keystore 相同的密码）"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
read -p "按回车键开始生成 keystore..."

# 生成 keystore
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Keystore 生成成功！"
    echo ""
    echo "文件位置: android/app/my-release-key.keystore"
    echo ""
    echo "接下来需要创建 keystore.properties 文件："
    echo "1. 复制模板文件: cp android/keystore.properties.template android/keystore.properties"
    echo "2. 编辑 android/keystore.properties，填写你刚才设置的密码"
    echo ""
    echo "⚠️  重要提示："
    echo "   - 请妥善保管 my-release-key.keystore 文件和密码"
    echo "   - 如果丢失，将无法更新已发布的应用"
    echo "   - keystore.properties 已在 .gitignore 中，不会被提交到代码仓库"
else
    echo ""
    echo "❌ Keystore 生成失败"
    echo ""
    echo "可能的原因："
    echo "  - 密码输入不一致"
    echo "  - 某些必填字段为空"
    echo "  - 操作被取消"
    exit 1
fi
