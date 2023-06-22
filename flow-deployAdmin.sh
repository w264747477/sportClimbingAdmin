echo -e "---------docker Login--------"
docker login --username=$1 registry.cn-beijing.aliyuncs.com --password=$2
echo -e "---------docker Stop--------"
docker stop scrapadminbookCt
echo -e "---------docker Rm--------"
docker rm scrapadminbookCt
docker rmi registry.cn-beijing.aliyuncs.com/qqzone/sportclimbingadmin:latest
echo -e "---------docker Pull--------"
docker pull registry.cn-beijing.aliyuncs.com/qqzone/sportclimbingadmin:latest
echo -e "---------docker Create and Start--------"
docker run --rm -d -p 8081:8081 --name scrapadminbookCt registry.cn-beijing.aliyuncs.com/qqzone/sportclimbingadmin:latest
echo -e "---------deploy Success--------"
