package Mern.Practical.task.Repository;

import Mern.Practical.task.Entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {
    @Query("{ 'firstName': { $regex: ?0, $options: 'i' } }")
    List<User> searchUsers(String keyword);
}
