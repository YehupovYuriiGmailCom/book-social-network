package com.alibou.book.history;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface TranactionHistoryRepository extends JpaRepository<BookTransactionHistory, Integer> {
    @Query("""
            SELECT history
            from BookTransactionHistory history
            where history.user.id = :userId
            """)
    Page<BookTransactionHistory> findAllBorrowedBooks(Pageable pageable, Integer userId);

    @Query("""
            SELECT history
            from BookTransactionHistory history
            where history.book.owner.id = :userId
            """)
    Page<BookTransactionHistory> findAllReturnedBooks(Pageable pageable, Integer userId);

    @Query("""
            SELECT (count(*) > 0) as isBorrwed
            from BookTransactionHistory bookTransactionHistory
            where bookTransactionHistory.user.id = :userId
            AND bookTransactionHistory.book.id = :bookId
            AND bookTransactionHistory.returnApproved = false
            """)
    boolean isAlreadyBorrowedByUser(Integer bookId, Integer userId);

    @Query("""
            SELECT transaction
            from BookTransactionHistory transaction
            where transaction.user.id = :userId
            AND transaction.book.id = :bookId
            AND transaction.returned = false
            AND transaction.returnApproved = false
            """)
    Optional<BookTransactionHistory> findByBookIdAndUserId(Integer bookId, Integer userId);

    @Query("""
            SELECT transaction
            from BookTransactionHistory transaction
            where transaction.book.owner.id = :userId
            AND transaction.book.id = :bookId
            AND transaction.returned = true
            AND transaction.returnApproved = false
            """)
    Optional<BookTransactionHistory> findByBookIdAndOwnerId(Integer bookId, Integer id);
}
