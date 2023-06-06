echo -e "---------docker Login--------"
docker login --username=$1 ccr.ccs.tencentyun.com --password=$2
echo -e "---------docker Stop--------"
docker stop scrapbookCt
echo -e "---------docker Rm--------"
docker rm scrapbookCt
docker rmi ccr.ccs.tencentyun.com/wqqahl/scrapbook:latest
echo -e "---------docker Pull--------"
docker pull ccr.ccs.tencentyun.com/wqqahl/scrapbook:latest
echo -e "---------docker Create and Start--------"
docker run --rm -d -p 8081:8081 --name scrapbookCt ccr.ccs.tencentyun.com/wqqahl/scrapbook:latest
echo -e "---------deploy Success--------"
