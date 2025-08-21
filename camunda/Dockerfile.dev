FROM camunda/camunda-bpm-platform:tomcat-7.20.0

RUN rm -rf /camunda/webapps/camunda-invoice \
    /camunda/webapps/camunda-welcome

COPY ./config/web.xml /camunda/webapps/engine-rest/WEB-INF/web.xml

COPY ./config/bpm-platform.xml /camunda/conf/bpm-platform.xml

ENV TZ=Asia/Tehran

EXPOSE 8080