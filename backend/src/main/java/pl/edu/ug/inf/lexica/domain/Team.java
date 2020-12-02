package pl.edu.ug.inf.lexica.domain;

import lombok.Data;

import java.util.List;

@Data
public class Team extends Identifiable{


    private String name;
    private List<String> memberIds;
    private String leaderId;
    private List<String> taskIds;
    private String description;

}
