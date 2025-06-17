import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Resend } from 'resend';

// Vérification de la clé API Resend
const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) {
  console.warn('RESEND_API_KEY is not defined in environment variables');
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(req: Request) {
  try {
    const { name, prenom, email, password } = await req.json();

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Un utilisateur avec cet email existe déjà." },
        { status: 400 }
      );
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        name,
        prenom,
        email,
        password: hashedPassword,
      },
    });

    // Envoyer l'email de confirmation si Resend est configuré
    if (resend) {
      try {
        await resend.emails.send({
          from: 'XI-COM <onboarding@resend.dev>',
          to: email,
          subject: 'Bienvenue sur XI-COM !',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #4F46E5;">Bienvenue sur XI-COM !</h1>
              <p>Bonjour ${name},</p>
              <p>Merci de vous être inscrit sur XI-COM. Votre compte a été créé avec succès.</p>
              <p>Vous pouvez maintenant vous connecter à votre compte en utilisant votre email et votre mot de passe.</p>
              <div style="margin: 30px 0;">
                <a href="${process.env.NEXTAUTH_URL}/login" 
                   style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
                  Se connecter
                </a>
              </div>
              <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
              <p>Cordialement,<br>L'équipe XI-COM</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Erreur lors de l\'envoi de l\'email:', emailError);
        // On continue même si l'envoi d'email échoue
      }
    }

    return NextResponse.json(
      { 
        message: 'Inscription réussie ! Un email de confirmation a été envoyé.',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return NextResponse.json(
      { error: "Une erreur s'est produite lors de l'inscription." },
      { status: 500 }
    );
  }
}
