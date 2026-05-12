/**
     * Test si la page de login est accessible.
     */
    public function test_login_screen_can_be_rendered(): void
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
    }

    /**
     * Test si un utilisateur peut accéder au dashboard après authentification.
     */
    public function test_authenticated_user_can_access_dashboard(): void

        $user = \App\Models\User::factory()->create();
        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertStatus(200);
        $response->assertSee('Dashboard'); // كيتأكد بلي كلمة Dashboard كاينا في الصفحة
    }
