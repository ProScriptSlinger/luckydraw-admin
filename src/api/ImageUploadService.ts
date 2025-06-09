import { createClient, SupabaseClient } from '@supabase/supabase-js';

export default class ImageUploadService {
    private static instance: ImageUploadService;
    private supabaseClient: SupabaseClient;

    private constructor() {
        if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
            throw new Error('Supabase URL and Anon Key must be provided');
        }

        this.supabaseClient = createClient(
            import.meta.env.VITE_SUPABASE_URL,
            import.meta.env.VITE_SUPABASE_ANON_KEY
        );
    }

    public static getInstance(): ImageUploadService {
        if (!ImageUploadService.instance) {
            ImageUploadService.instance = new ImageUploadService();
        }
        return ImageUploadService.instance;
    }

    public async uploadImage(
        file: File,
        bucketName: string = 'images-paiper',
        options?: {
            fileName?: string;
            fileExtension?: string;
            cacheControl?: string;
            upsert?: boolean;
        }
    ): Promise<string | null> {
        try {
            if (!file) throw new Error('File is required');
            if (!bucketName) throw new Error('Bucket name is required');

            // Generate unique filename with optional custom name/extension
            const fileExt = options?.fileExtension || file.name.split('.').pop() || 'bin';
            const fileName = options?.fileName || `${Date.now()}`;
            const filePath = `${fileName}.${fileExt}`;

            const uploadOptions = {
                cacheControl: options?.cacheControl || '3600',
                upsert: options?.upsert || false,
                contentType: file.type
            };

            const { data, error } = await this.supabaseClient.storage
                .from(bucketName)
                .upload(filePath, file, uploadOptions);

            if (error) throw error;

            // Get public URL
            const { data: { publicUrl } } = this.supabaseClient.storage
                .from(bucketName)
                .getPublicUrl(data.path);

            return publicUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw new Error(`Image upload failed: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    public async deleteImage(
        filePath: string,
        bucketName: string = 'images-mini'
    ): Promise<boolean> {
        try {
            const { error } = await this.supabaseClient.storage
                .from(bucketName)
                .remove([filePath]);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error deleting image:', error);
            return false;
        }
    }
}