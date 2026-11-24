# 한원빈 자기소개 웹앱

1주차 기획서를 바탕으로 만든 정적 배포용 첫 버전입니다.

## Windows에서 미리보기

압축을 풀고 VS Code에서 이 폴더를 연 뒤 PowerShell 터미널에서 실행합니다.

```powershell
python -m http.server 8000 --directory site
```

브라우저에서 http://localhost:8000/ 을 엽니다. 프로젝트 카드는 HTTP로 JSON을 읽으므로 HTML 파일을 더블클릭하면 동작하지 않을 수 있습니다.

- 이메일을 공개하려면 `site/app.js` 상단의 `contactEmail`에 공개용 이메일을 입력합니다.
- 꾸욱의 공개 저장소가 있으면 `site/data/projects.json`의 해당 `repository`에 주소를 입력합니다.
- 방명록은 AppSync 및 DynamoDB를 연결한 뒤 활성화할 화면입니다.

## GitHub에 올리기

GitHub에서 README를 추가하지 않은 빈 저장소 `self-intro-aws`를 만듭니다. VS Code 터미널에서 이 README가 있는 폴더를 기준으로 실행합니다. YOUR_ID를 본인 GitHub 아이디로 바꿉니다.

```powershell
git init -b main
git add README.md site
git commit -m "Add self-introduction web app"
git remote add origin https://github.com/YOUR_ID/self-intro-aws.git
git push -u origin main
```

Claude Code를 사용할 경우 같은 폴더에서 `claude`를 실행해 프로젝트 파일과 Git 상태를 확인합니다.

## AWS에 올리기

1. 일반 S3 버킷을 만들고 **모든 퍼블릭 액세스 차단**을 유지합니다. 객체 소유권은 **Bucket owner enforced**를 사용합니다.
2. **site 폴더 안의 내용**을 버킷에 업로드합니다. 객체 키는 `index.html`, `style.css`, `app.js`, `data/projects.json`이어야 합니다. S3 웹사이트 호스팅은 비활성 상태로 둡니다.
3. CloudFront 배포에서 S3 버킷을 원본으로 선택합니다. OAC를 연결하고 **Sign requests (recommended)**를 사용합니다. 뷰어 프로토콜은 **Redirect HTTP to HTTPS**, 기본 루트 객체는 `index.html`입니다.
4. S3 권한에서 CloudFront가 제공한 버킷 정책을 확인합니다. 서비스 주체 `cloudfront.amazonaws.com`에 객체 읽기 `s3:GetObject`를 허용하고 현재 배포 ARN으로 제한해야 합니다. 정책이 자동 적용되지 않았다면 CloudFront 콘솔에서 복사해 S3 버킷 정책에 추가합니다.
5. 배포 완료 후 CloudFront 도메인의 루트와 프로젝트 상세를 확인합니다. S3의 `index.html` 객체 URL을 시크릿 창에 붙여 넣어 `403 AccessDenied`를 확인합니다.

## 제출 캡처

- Claude Code에서 프로젝트 폴더를 연 화면과 파일 및 커밋이 표시된 GitHub 저장소
- S3 객체 목록, 퍼블릭 액세스 차단, 버킷 정책
- CloudFront 배포 도메인 및 S3 원본의 OAC 연결
- CloudFront 접속 성공과 S3 객체 URL 직접 접속 거부
- 제출란에 실제 CloudFront HTTPS 주소 기재
