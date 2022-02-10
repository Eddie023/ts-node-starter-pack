build:
	DOCKER_BUILLDKIT=1 docker build -t node-js-boilerplate:0.0.1 -f zarf/docker/development/Dockerfile .

run:
	docker run -d --network=host \
		-e "DB_HOST=127.0.0.1" \
		-e "DB_USERNAME=todo_admin" \
		-e "DB_PASSWORD=todo123" \
		-e "DB_NAME=todo_db"  \
		node-js-boilerplate:0.0.1

docker-up:
	docker-compose -f zarf/docker/development/docker-compose.yml up

docker-update:
	docker-compose -f zarf/docker/development/docker-compose.yml up -d --no-deps --build

docker-logs:
	docker-compose -f zarf/docker/development/docker-compose.yml logs -f

docker-logs-api:
	docker-compose -f zarf/docker/development/docker-compose.yml logs -f api

docker-migrate-latest:
	docker-compose -f zarf/docker/development/docker-compose.yml exec api npm run migrate:latest
