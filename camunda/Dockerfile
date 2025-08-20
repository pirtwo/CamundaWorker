FROM camunda/camunda-bpm-platform:tomcat-7.20.0

RUN rm -rf /camunda/webapps/camunda-invoice \
    /camunda/webapps/camunda-welcome

COPY ./config/web.xml /camunda/webapps/engine-rest/WEB-INF/web.xml

COPY ./config/bpm-platform.xml /camunda/conf/bpm-platform.xml

# Optional: add MySQL JDBC driver if your image doesn’t already include it
# COPY ./drivers/mysql-connector-j-8.4.0.jar /camunda/configuration/userlib/

# Optional: align container timezone; remove if you prefer UTC
ENV TZ=Asia/Tehran

EXPOSE 8080