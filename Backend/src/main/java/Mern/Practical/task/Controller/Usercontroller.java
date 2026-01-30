package Mern.Practical.task.Controller;

import Mern.Practical.task.Entity.User;
import Mern.Practical.task.Service.Userservice;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.io.PrintWriter;
import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"})
public class Usercontroller {

    @Autowired
    private Userservice userService;

    // ADD USER
    @PostMapping
    public User addUser(@RequestBody User user) {
        return userService.saveUser(user);
    }
    @GetMapping("/search/{keyword}")
    public List<User> search(@PathVariable String keyword) {
        return userService.searchUsers(keyword);
    }
    @GetMapping("/export")
    public void exportCsv(HttpServletResponse response) throws Exception {

        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=users.csv");

        List<User> users = userService.getAllUsers();

        PrintWriter writer = response.getWriter();
        writer.println("FirstName,LastName,Email,Mobile,Gender,Status,Location");

        for (User u : users) {
            writer.println(
                    u.getFirstName() + "," +
                            u.getLastName() + "," +
                            u.getEmail() + "," +
                            u.getMobile() + "," +
                            u.getGender() + "," +
                            u.getStatus() + "," +
                            u.getLocation()
            );
        }
    }



    // UPDATE USER
    @PutMapping("/{id}")
    public User updateUser(@PathVariable String id, @RequestBody User user) {
        user.setId(id);
        return userService.saveUser(user);
    }

    // GET ALL USERS (TABLE)
    @GetMapping
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    // VIEW USER
    @GetMapping("/{id}")
    public User getUser(@PathVariable String id) {
        return userService.getUserById(id);
    }

    // DELETE USER
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return "Deleted successfully";
    }
    // ✅ NEW PAGINATION API
    @GetMapping("/page")
    public Page<User> getUsersByPage(
            @RequestParam int page,
            @RequestParam int size
    ) {
        return userService.getUsersWithPagination(page, size);
    }
}
