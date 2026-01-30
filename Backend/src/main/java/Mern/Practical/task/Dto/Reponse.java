package Mern.Practical.task.Dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Reponse{

    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private Integer age;
    private String address;
}

