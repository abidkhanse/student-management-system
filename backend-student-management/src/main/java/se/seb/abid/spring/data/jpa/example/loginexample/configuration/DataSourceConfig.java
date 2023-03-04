package se.seb.abid.spring.data.jpa.example.loginexample.configuration;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class DataSourceConfig {


    /*
    * How to check if database is not available and how to handle this error
    */
    @Bean
    public DataSource getDataSource(){

        DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();

        return dataSourceBuilder.url("jdbc:mysql://localhost:3306/myapplication")
                .driverClassName("com.mysql.cj.jdbc.Driver")
                .username("root")
                .password("root")
                .build();
    }
}
