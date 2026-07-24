package com.alibou.book.file;

import static java.io.File.separator;
import com.alibou.book.book.Book;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@Slf4j
@RequiredArgsConstructor
public class FileStorageService {

    @Value("${spring.application.file.uploads.photos-output-path}")
    private String fileUploadPath;

    public String saveFile(
            @NonNull final MultipartFile sourceFile,
            @NonNull final Integer userId) {

        final String fileUploadSubPath = "users" + separator + userId;

        return uploadFile(sourceFile, fileUploadSubPath);
    }

    private String uploadFile(final @NonNull MultipartFile sourceFile, final @NonNull String fileUploadSubPath) {
        final String finalUploadPath = fileUploadPath + separator + fileUploadSubPath;
        File targetFolder = new File(finalUploadPath);
        if (!targetFolder.exists()){
            boolean folderCreated = targetFolder.mkdirs();
            if (!folderCreated){
                log.warn("Failed to create the target folder");
                return null;
            }
        }

        final String fileExtension = getFileExtension(sourceFile.getOriginalFilename());
        String targetFilePath = finalUploadPath + separator + System.currentTimeMillis() + "." + fileExtension;
        Path targetPath = Paths.get(targetFilePath);
        try {
            Files.write(targetPath, sourceFile.getBytes());
            log.info("File saved to " + targetFilePath);
            return targetFilePath;
        } catch (Exception e) {
            log.error("File was not saved", e);
        }

        return null;
    }

    private String getFileExtension(final @Nullable String filename) {
        if (filename == null || filename.isEmpty()){
            return "";
        }
        int lastDotIndex = filename.lastIndexOf(".");
        if (lastDotIndex == -1){
            return "";
        }
        return filename.substring(lastDotIndex + 1).toLowerCase();
    }
}
