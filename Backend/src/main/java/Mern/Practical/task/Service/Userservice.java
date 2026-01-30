package Mern.Practical.task.Service;

import Mern.Practical.task.Entity.User;
import Mern.Practical.task.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Userservice {

    @Autowired
    private UserRepository userRepository;

    // ADD USER
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // GET ALL USERS
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // GET USER BY ID
    public User getUserById(String id) {
        return userRepository.findById(id).orElse(null);
    }

    public List<User> searchUsers(String keyword) {
        return userRepository.searchUsers(keyword);
    }

    // DELETE USER
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
    public Page<User> getUsersWithPagination(int page, int size) {
        return userRepository.findAll(PageRequest.of(page, size));
    }
}
