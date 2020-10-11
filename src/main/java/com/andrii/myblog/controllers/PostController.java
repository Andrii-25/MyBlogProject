package com.andrii.myblog.controllers;

import com.andrii.myblog.models.Post;
import com.andrii.myblog.repo.PostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
class PostController {

    private final Logger log = LoggerFactory.getLogger(PostController.class);
    private PostRepository postRepository;

    public PostController(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @GetMapping("/posts")
    Collection<Post> posts() {
        return postRepository.findAll();
    }


    @GetMapping("/post/{id}")
    ResponseEntity<?> getPost(@PathVariable Long id) {
        Optional<Post> post = postRepository.findById(id);
        return post.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/more/{id}")
    ResponseEntity<?> getPostMore(@PathVariable Long id) {
        Optional<Post> post = postRepository.findById(id);
        return post.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/post")
    ResponseEntity<Post> createPost(@Valid @RequestBody Post post) throws URISyntaxException {
        log.info("Request to create post: {}", post);
        Post result = postRepository.save(post);
        return ResponseEntity.created(new URI("/api/post/" + result.getId()))
                .body(result);
    }

    @PutMapping("/post/{id}")
    ResponseEntity<Post> updatePost(@Valid @RequestBody Post post) {
        log.info("Request to update post: {}", post);
        Post result = postRepository.save(post);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/post/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
        log.info("Request to delete post: {}", id);
        postRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
