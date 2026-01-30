package Mern.Practical.task.Dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class Request {

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @Size(min = 10, max = 10, message = "Phone number must be 10 digits")
    private String phone;

    @NotNull(message = "Age is required")
    private Integer age;

    @NotBlank(message = "Address is required")
    private String address;
}
