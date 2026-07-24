package com.alibou.book.feedback;

import com.alibou.book.book.Book;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class FeedbackMapper {

    public Feedback toFeedback(final FeedbackRequest request) {
        return Feedback.builder()
                .note(request.note())
                .book(Book.builder().id(request.bookId()).archived(false).shareable(false).build())
                .build();
    }

    public FeedbackResponse toFeedbackResponse(final Feedback feedback, final Integer id) {
        return FeedbackResponse.builder()
                .note(feedback.getNote())
                .comment(feedback.getComment())
                .ownFeedback(Objects.equals(feedback.getCreatedBy(), id))
                .build();
    }
}
